
import { statusExport, topicCommentArr } from 'constants/riskAnalysis';
import { progressTextReadability } from 'helpers/until';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
interface CustomJsPDF extends jsPDF {
  lastAutoTable: {
    finalY?: number;
  };
}

export const exportPdf = (dataAnalysis, conversation) => {
  // Define a function named "getStatusRisk" that takes a "status" parameter and returns a value from the "statusRisk" array based on the label
  const getStatusExport = (status) => {
    return statusExport.find(item => item.label === status)?.value;
  }

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

  // Instantiate jsPDF object
  const pdf = new jsPDF() as unknown as CustomJsPDF;

  pdf.text('Risk Analysis Data', 80, 15);

  const headers = [["Name Topic", "Status", "Source Text", "Comment"]];

  let dataExport: any = [];
  dataAnalysis.sort(function (a, b) {
    return a["topic_order"] < b["topic_order"] ? -1 : 1;
  })

  dataAnalysis.forEach((data: any) => {
    dataExport.push([
      data.analysis_result.topic,
      '',
      getSourceTexe(data.analysis_result.source_text),
      genComment(data.analysis_result),
      data.analysis_result.status,
    ])
  })

  let drawnRows: any = [];
  // Add table to PDF document
  autoTable(pdf, {
    head: headers,
    body: dataExport,
    theme: 'grid',
    showHead: 'firstPage',
    headStyles: {
      fillColor: [38, 173, 201],
      lineColor: [203, 203, 203],
      lineWidth: 0.1,
    },
    didDrawCell: (data) => {
      if (data.column.index === 1 && data.cell.section === 'body') {
        const rowIndex = data.row.index;
        const cell = data.cell;
        const icon = getStatusExport(data.row.raw[4])?.toString();
        // Add image to the cell
        if (rowIndex >= 0 && !drawnRows.includes(rowIndex) && typeof icon === "string") {
          // Ensure icon is defined and is not just any Element, but specifically an HTMLImageElement or HTMLCanvasElement, or string.
          pdf.addImage(icon, 'PNG', cell.x + 4, cell.y + 1, 5, 5); // Adjust position and size accordingly
          drawnRows.push(rowIndex);
        }
      }
    },
    startY: 20,
  });

  autoTable(pdf, {
    head: [["Chat Data"]],
    body: [],
    theme: 'grid',
    showHead: 'firstPage',
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontSize: 16,
      fontStyle: 'normal',
      halign: 'center',
      cellPadding: [5, 0, -3, 0],
    },
  });

  const headersChat = [["Question", "Answer"]];
  let dataChat: any = [];
  conversation.forEach((message: any) => {
    dataChat.push([
      message.question,
      message.answer,
    ]);
  })

  autoTable(pdf, {
    head: headersChat,
    body: dataChat,
    theme: 'grid',
    showHead: 'firstPage',
    headStyles: {
      fillColor: [38, 173, 201],
      lineColor: [203, 203, 203],
      lineWidth: 0.1,
    },
  });

  // Save the PDF file
  pdf.save("data.pdf");
}
