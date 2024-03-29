import { FC } from "react";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";
import { formattedDate } from "../../utils/helpers";
import { DialogLineType, ScenarioType } from "../Editor/Scenario.state";
import scenariosJson from "../../config/scenarios.json";

export interface DocxGeneratorProps {
  scenario: ScenarioType;
  fileName: string;
  downloadComplete: () => void;
}

const DocxGenerator: FC<DocxGeneratorProps> = ({
  scenario,
  fileName,
  downloadComplete,
}: DocxGeneratorProps) => {
  if (!scenario) {
    return null;
  }

  const dialog = scenario.dialogArray.map((line: DialogLineType) => {
    return {
      actorName: line.actor.name,
      text: line.text,
    };
  });

  const createActorName = (text: string) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: `${text}:`,
          size: 32,
          font: "Liberation Sans",
          bold: true,
        }),
      ],
    });
  };

  const createParagraph = (text: string) => {
    const paragraph = {
      size: 32,
      font: "Liberation Sans",
    };
    const subLines = text.split("\n");
    if (subLines.length > 1) {
      const children = [];
      for (let i = 0; i < subLines.length; i++) {
        children.push(
          new TextRun({
            ...paragraph,
            text: subLines[i],
            break: Number(i > 0),
          })
        );
      }
      return new Paragraph({ children });
    } else {
      return new Paragraph({
        children: [
          new TextRun({
            ...paragraph,
            text,
          }),
        ],
      });
    }
  };

  const createActorText = (text: string) => createParagraph(text);
  const createEmptyLine = () => createParagraph("");

  const scenarioTitle = scenariosJson.scenariosTypes.find(
    (scenario) => scenario.type === "gip"
  )?.name;

  const doc = new Document({
    title: scenario.title,
    description: scenario.intro,
    sections: [
      {
        children: [
          createParagraph(scenarioTitle!),
          new Paragraph({
            text: scenario.title,
            heading: HeadingLevel.TITLE,
          }),
          createEmptyLine(),
          createParagraph(scenario.intro),
          createEmptyLine(),
          createEmptyLine(),
          ...dialog
            .map((line) => {
              const arr: Paragraph[] = [];

              if (line.actorName) {
                arr.push(createActorName(line.actorName));
                arr.push(createActorText(line.text));
                arr.push(createEmptyLine());
              } else {
                arr.push(createEmptyLine());
                arr.push(createActorText(line.text));
                arr.push(createEmptyLine());
                arr.push(createEmptyLine());
              }

              return arr;
            })
            .reduce((prev, curr) => prev.concat(curr), []),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${fileName}-${formattedDate(new Date())}.docx`;
    link.click();
    downloadComplete();
  });

  return null;
};

export default DocxGenerator;
