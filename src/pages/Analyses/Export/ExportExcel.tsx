
import { topicCommentArr, topicDisable } from 'constants/riskAnalysis';

const ExcelJS = require('exceljs');

// Define style
const borderStyle = {
  top: { style: "thin", color: { argb: "e9e9e9" } },
  left: { style: "thin", color: { argb: "e9e9e9" } },
  bottom: { style: "thin", color: { argb: "e9e9e9" } },
  right: { style: "thin", color: { argb: "e9e9e9" } }
};

const fillStyle = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "26ADC9" },
};

const fontStyle = {
  size: 14,
  bold: true,
  color: { argb: "ffffff" },
};

const alignmentStyle = {
  vertical: 'middle',
  horizontal: 'left',
  wrapText: true,
}; 

export const exportToExcel = (dataAnalysis, conversation) => {

  const getSourceTexe = (data) => {
    let text = '';
    let isCount = data.length > 1 && data.every(item => item)
    data.forEach((item) => {
      if (item) {
        text += `${isCount ? '- ' : ''}` + item + '\n';
      }
    })
    return text;
  }

  const genComment = (data) => {
    let comment = '';
    const topicName = data.topic
    if (topicName === 'Readability') {
      comment = 'Readability score for whole document: '
        + data.comment["Readability score for whole document"]
        + '\n'
        + 'Three worst clauses: ';
      if (typeof data.comment["Three worst clauses"] === "string" || data.comment["Three worst clauses"].length === 0) {
        comment += 'N/A';
      } else {
        data.comment["Three worst clauses"].forEach(item => {
          comment += `\n- ` + item.clause + ' ' + item.score
        })
      }
    } else if (topicName === 'Unused definitions') {
      if (typeof data.comment === "string") {
        comment = data.comment;
      } else {
        comment = data.comment["key"] + ": \n";
        data.comment["value"]?.forEach(item => {
          comment += "- " + item + "\n";
        })
      }
    } else if (!topicCommentArr.includes(topicName)) {
      comment = data.comment;
    } else if (!data.comment["has_identical_clause"] || typeof data.comment["value"] === "string") {
      comment = data.comment["value"]
    } else {
      comment = data.comment["key"] + ": \n";
      data.comment["value"]?.forEach(item => {
        comment += "- " + item + "\n";
      })
    }
    return comment;
  }

  let dataAnaly: any = [];
  dataAnalysis.sort(function (a, b) {
    return a["topic_order"] < b["topic_order"] ? -1 : 1;
  })

  dataAnalysis.forEach((data: any) => {
    if (!topicDisable.includes(data.analysis_result?.topic)) {
      dataAnaly.push({
        name: data.analysis_result.topic,
        status: data.analysis_result.status,
        source_text: getSourceTexe(data.analysis_result.source_text),
        comment: genComment(data.analysis_result)
      })
    }
  })

  const workbook = new ExcelJS.Workbook();
  const sheetAnalysis = workbook.addWorksheet("Ananysis");

  // Assuming 'sheet' is your worksheet object
  const rowAnalysis = sheetAnalysis.getRow(1);
  rowAnalysis.height = 30;

  // Apply the border style to the first 4 cells in the row
  for (let col = 1; col <= 4; col++) {
    const cell = rowAnalysis.getCell(col);
    cell.border = borderStyle;
    cell.fill = fillStyle;
    cell.font = fontStyle;
    cell.alignment = alignmentStyle;
  }

  rowAnalysis.commit();

  sheetAnalysis.columns = [
    {
      header: "Name Topic",
      key: 'name',
      width: 15,
    },
    {
      header: "Status",
      key: 'status',
      width: 10,
    },
    {
      header: "Source Text",
      key: 'source_text',
      width: 90,
    },
    {
      header: "Comment",
      key: 'comment',
      width: 90,
    },
  ]

  dataAnaly.map(data => {
    // Add new row to sheet
    const newRow = sheetAnalysis.addRow({
      name: data.name,
      status: data.status,
      source_text: data.source_text,
      comment: data.comment,
    });

    newRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.alignment = alignmentStyle;
    });
  });

  const sheetChat = workbook.addWorksheet("Chat");

  // Assuming 'sheet' is your worksheet object
  const rowChat = sheetChat.getRow(1);
  rowChat.height = 30;

  // Apply the border style to the first 4 cells in the row
  for (let col = 1; col <= 2; col++) {
    const cell = rowChat.getCell(col);
    cell.border = borderStyle;
    cell.fill = fillStyle;
    cell.font = fontStyle;
    cell.alignment = alignmentStyle;
  }

  rowChat.commit();

  sheetChat.columns = [
    {
      header: "Question",
      key: 'question',
      width: 100,
    },
    {
      header: "Answer",
      key: 'answer',
      width: 100,
    },
  ]

  conversation.map(data => {
    // Add new row to sheet
    const newRow = sheetChat.addRow({
      question: data.answer,
      answer: data.answer,
    });

    newRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.alignment = alignmentStyle;
    });
  });

  workbook.xlsx.writeBuffer().then(data => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
    })
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'data_excel.xlsx';
    anchor.click();
    window.URL.revokeObjectURL(url);
  })
}