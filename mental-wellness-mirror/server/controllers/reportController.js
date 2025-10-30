import PDFDocument from 'pdfkit';
import Entry from '../models/Entry.js';

// Generate therapy report from last 10 entries
export const generateReport = async (req, res) => {
  try {
    // Fetch last 10 entries
    const entries = await Entry.find()
      .sort({ createdAt: -1 })
      .limit(10);

    if (entries.length === 0) {
      return res.status(404).json({ 
        error: 'No entries found. Please create some journal entries first.' 
      });
    }

    // Calculate statistics
    const stats = calculateStatistics(entries);

    // Create PDF document
    const doc = new PDFDocument({ 
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=mental-wellness-report-${Date.now()}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Generate PDF content
    generatePDFContent(doc, entries, stats);

    // Finalize PDF
    doc.end();

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

// Calculate statistics from entries
function calculateStatistics(entries) {
  const stats = {
    totalEntries: entries.length,
    dateRange: {
      start: entries[entries.length - 1].createdAt,
      end: entries[0].createdAt
    },
    entryTypes: {
      text: entries.filter(e => e.entryType === 'text').length,
      voice: entries.filter(e => e.entryType === 'voice').length
    },
    avgStress: 0,
    avgAnxiety: 0,
    stressTrend: 'stable',
    anxietyTrend: 'stable',
    moodDistribution: {},
    highStressDays: 0,
    highAnxietyDays: 0,
    dominantMood: '',
    concerningPatterns: []
  };

  // Calculate averages
  let totalStress = 0;
  let totalAnxiety = 0;
  const moodCounts = {};

  entries.forEach(entry => {
    totalStress += entry.stressScore || 0;
    totalAnxiety += entry.anxietyScore || 0;
    
    if (entry.stressScore > 70) stats.highStressDays++;
    if (entry.anxietyScore > 70) stats.highAnxietyDays++;

    const mood = entry.mood.toLowerCase();
    moodCounts[mood] = (moodCounts[mood] || 0) + 1;
  });

  stats.avgStress = Math.round(totalStress / entries.length);
  stats.avgAnxiety = Math.round(totalAnxiety / entries.length);
  stats.moodDistribution = moodCounts;

  // Find dominant mood
  stats.dominantMood = Object.keys(moodCounts).reduce((a, b) => 
    moodCounts[a] > moodCounts[b] ? a : b
  );

  // Calculate trends (comparing first half vs second half)
  const midpoint = Math.floor(entries.length / 2);
  const recentEntries = entries.slice(0, midpoint);
  const olderEntries = entries.slice(midpoint);

  const recentAvgStress = recentEntries.reduce((sum, e) => sum + (e.stressScore || 0), 0) / recentEntries.length;
  const olderAvgStress = olderEntries.reduce((sum, e) => sum + (e.stressScore || 0), 0) / olderEntries.length;
  
  const recentAvgAnxiety = recentEntries.reduce((sum, e) => sum + (e.anxietyScore || 0), 0) / recentEntries.length;
  const olderAvgAnxiety = olderEntries.reduce((sum, e) => sum + (e.anxietyScore || 0), 0) / olderEntries.length;

  if (recentAvgStress > olderAvgStress + 10) stats.stressTrend = 'increasing';
  else if (recentAvgStress < olderAvgStress - 10) stats.stressTrend = 'decreasing';

  if (recentAvgAnxiety > olderAvgAnxiety + 10) stats.anxietyTrend = 'increasing';
  else if (recentAvgAnxiety < olderAvgAnxiety - 10) stats.anxietyTrend = 'decreasing';

  // Identify concerning patterns
  if (stats.avgStress > 70 || stats.avgAnxiety > 70) {
    stats.concerningPatterns.push('Consistently high stress/anxiety levels');
  }
  if (stats.highStressDays >= entries.length * 0.6) {
    stats.concerningPatterns.push('Frequent episodes of high stress');
  }
  if (stats.highAnxietyDays >= entries.length * 0.6) {
    stats.concerningPatterns.push('Frequent episodes of high anxiety');
  }
  if (stats.stressTrend === 'increasing' || stats.anxietyTrend === 'increasing') {
    stats.concerningPatterns.push('Worsening emotional state over time');
  }

  return stats;
}

// Generate PDF content
function generatePDFContent(doc, entries, stats) {
  const pageWidth = doc.page.width - 100;
  
  // Header
  doc.fontSize(24)
     .fillColor('#2c5f7f')
     .text('Mental Wellness Report', { align: 'center' });
  
  doc.fontSize(12)
     .fillColor('#666')
     .text(`Generated on ${new Date().toLocaleDateString('en-US', { 
       year: 'numeric', 
       month: 'long', 
       day: 'numeric' 
     })}`, { align: 'center' });
  
  doc.moveDown(2);

  // Report period
  doc.fontSize(10)
     .fillColor('#999')
     .text(`Report Period: ${new Date(stats.dateRange.start).toLocaleDateString()} - ${new Date(stats.dateRange.end).toLocaleDateString()}`, 
           { align: 'center' });
  
  doc.moveDown(1);
  addHorizontalLine(doc);
  doc.moveDown(1);

  // Executive Summary
  addSection(doc, 'Executive Summary');
  doc.fontSize(10)
     .fillColor('#333')
     .text(`This report analyzes ${stats.totalEntries} journal entries to provide insights into the patient's mental wellness patterns. ` +
           `The analysis includes ${stats.entryTypes.text} written and ${stats.entryTypes.voice} voice entries.`, {
       align: 'justify',
       lineGap: 4
     });
  
  doc.moveDown(1.5);

  // Key Metrics
  addSection(doc, 'Key Metrics');
  
  addMetricBox(doc, 'Average Stress Level', `${stats.avgStress}/100`, getScoreColor(stats.avgStress), getScoreInterpretation(stats.avgStress));
  doc.moveDown(0.5);
  
  addMetricBox(doc, 'Average Anxiety Level', `${stats.avgAnxiety}/100`, getScoreColor(stats.avgAnxiety), getScoreInterpretation(stats.avgAnxiety));
  doc.moveDown(0.5);
  
  addMetricBox(doc, 'Dominant Emotional State', stats.dominantMood.charAt(0).toUpperCase() + stats.dominantMood.slice(1), '#6b8e7f', '');
  
  doc.moveDown(1.5);

  // Trends Analysis
  addSection(doc, 'Trends Analysis');
  
  doc.fontSize(10)
     .fillColor('#333')
     .text(`Stress Trend: `, { continued: true })
     .fillColor(getTrendColor(stats.stressTrend))
     .text(stats.stressTrend.toUpperCase());
  
  doc.fillColor('#333')
     .text(`Anxiety Trend: `, { continued: true })
     .fillColor(getTrendColor(stats.anxietyTrend))
     .text(stats.anxietyTrend.toUpperCase());
  
  doc.moveDown(1.5);

  // Mood Distribution
  addSection(doc, 'Emotional State Distribution');
  
  Object.entries(stats.moodDistribution).forEach(([mood, count]) => {
    const percentage = Math.round((count / stats.totalEntries) * 100);
    doc.fontSize(10)
       .fillColor('#333')
       .text(`${mood.charAt(0).toUpperCase() + mood.slice(1)}: ${count} entries (${percentage}%)`, {
         indent: 20
       });
  });
  
  doc.moveDown(1.5);

  // Concerning Patterns
  if (stats.concerningPatterns.length > 0) {
    addSection(doc, '⚠️ Areas of Concern');
    
    stats.concerningPatterns.forEach((pattern, index) => {
      doc.fontSize(10)
         .fillColor('#d63031')
         .text(`${index + 1}. ${pattern}`, {
           indent: 20,
           lineGap: 3
         });
    });
    
    doc.moveDown(1.5);
  }

  // Clinical Observations (New Page)
  doc.addPage();
  
  addSection(doc, 'Detailed Clinical Observations');
  
  doc.fontSize(10)
     .fillColor('#333')
     .text('Recent Journal Entries Analysis:', { underline: true });
  
  doc.moveDown(0.5);

  // Display last 5 entries with details
  entries.slice(0, 5).forEach((entry, index) => {
    doc.fontSize(9)
       .fillColor('#2c5f7f')
       .text(`Entry ${index + 1} - ${new Date(entry.createdAt).toLocaleDateString()}`, { bold: true });
    
    doc.fontSize(8)
       .fillColor('#666')
       .text(`Type: ${entry.entryType === 'text' ? 'Written' : 'Voice'} | Mood: ${entry.mood} | Stress: ${entry.stressScore} | Anxiety: ${entry.anxietyScore}`);
    
    doc.fontSize(9)
       .fillColor('#333')
       .text(`Insight: ${entry.insight}`, {
         indent: 15,
         lineGap: 2
       });
    
    if (entry.content || entry.transcript) {
      const content = entry.content || entry.transcript;
      const truncated = content.length > 150 ? content.substring(0, 150) + '...' : content;
      doc.fontSize(8)
         .fillColor('#777')
         .text(`Content: "${truncated}"`, {
           indent: 15,
           lineGap: 2,
           italic: true
         });
    }
    
    doc.moveDown(0.8);
    addThinLine(doc);
    doc.moveDown(0.5);
  });

  // Recommendations
  doc.addPage();
  
  addSection(doc, 'Professional Recommendations');
  
  const recommendations = generateRecommendations(stats);
  
  recommendations.forEach((rec, index) => {
    doc.fontSize(10)
       .fillColor('#333')
       .text(`${index + 1}. ${rec}`, {
         indent: 20,
         lineGap: 4,
         align: 'justify'
       });
    doc.moveDown(0.5);
  });
  
  doc.moveDown(2);

  // Footer
  addHorizontalLine(doc);
  doc.moveDown(0.5);
  
  doc.fontSize(8)
     .fillColor('#999')
     .text('This report is generated for therapeutic purposes and should be reviewed by a licensed mental health professional.', {
       align: 'center',
       lineGap: 2
     });
  
  doc.text('All information is confidential and protected under patient privacy laws.', {
    align: 'center'
  });
}

// Helper functions
function addSection(doc, title) {
  doc.fontSize(14)
     .fillColor('#2c5f7f')
     .text(title, { bold: true });
  doc.moveDown(0.5);
}

function addMetricBox(doc, label, value, color, interpretation) {
  const y = doc.y;
  
  doc.fontSize(9)
     .fillColor('#666')
     .text(label);
  
  doc.fontSize(16)
     .fillColor(color)
     .text(value, { bold: true });
  
  if (interpretation) {
    doc.fontSize(8)
       .fillColor('#999')
       .text(interpretation);
  }
}

function addHorizontalLine(doc) {
  doc.strokeColor('#ddd')
     .lineWidth(1)
     .moveTo(50, doc.y)
     .lineTo(doc.page.width - 50, doc.y)
     .stroke();
}

function addThinLine(doc) {
  doc.strokeColor('#eee')
     .lineWidth(0.5)
     .moveTo(50, doc.y)
     .lineTo(doc.page.width - 50, doc.y)
     .stroke();
}

function getScoreColor(score) {
  if (score <= 20) return '#27ae60';
  if (score <= 40) return '#2ecc71';
  if (score <= 60) return '#f39c12';
  if (score <= 80) return '#e67e22';
  return '#d63031';
}

function getScoreInterpretation(score) {
  if (score <= 20) return 'Very Low - Healthy range';
  if (score <= 40) return 'Low - Manageable';
  if (score <= 60) return 'Moderate - Monitor closely';
  if (score <= 80) return 'High - Intervention recommended';
  return 'Very High - Urgent attention needed';
}

function getTrendColor(trend) {
  if (trend === 'decreasing') return '#27ae60';
  if (trend === 'stable') return '#3498db';
  return '#d63031';
}

function generateRecommendations(stats) {
  const recommendations = [];
  
  if (stats.avgStress > 70 || stats.avgAnxiety > 70) {
    recommendations.push(
      'Consider immediate intervention strategies including stress management techniques and possibly medication evaluation.'
    );
  }
  
  if (stats.stressTrend === 'increasing' || stats.anxietyTrend === 'increasing') {
    recommendations.push(
      'The patient shows a worsening trend. Increase session frequency and monitor for crisis indicators.'
    );
  }
  
  if (stats.highStressDays >= stats.totalEntries * 0.5) {
    recommendations.push(
      'Frequent high-stress episodes detected. Explore coping mechanisms and lifestyle factors contributing to stress.'
    );
  }
  
  if (stats.entryTypes.voice > stats.entryTypes.text) {
    recommendations.push(
      'Patient prefers voice journaling, which may indicate comfort with verbal expression. Consider verbal therapy approaches.'
    );
  }
  
  recommendations.push(
    'Continue encouraging regular journaling as it provides valuable insights into the patient\'s emotional patterns.'
  );
  
  recommendations.push(
    'Review this report with the patient to discuss patterns and collaborate on treatment goals.'
  );
  
  if (stats.avgStress < 40 && stats.avgAnxiety < 40) {
    recommendations.push(
      'Patient shows positive emotional regulation. Maintain current treatment approach and reinforce healthy coping strategies.'
    );
  }
  
  return recommendations;
}