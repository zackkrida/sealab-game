// src/Cell.ts
import {
  useType,
  useNewComponent,
  useDraw,
  Geometry,
  Polygon,
  Vector,
  SystemFont,
  TextBox,
  Mouse,
  Label
} from "@hex-engine/2d";

export default function TextPager({ size, position, text } : TextPagerParams) {
  let state: { didTextFit?: boolean, remainingText?: string, printedLines?: string[], activeText: string} = {activeText: text}

  const nextPage = () => {
    if (!state?.didTextFit && state?.remainingText) {
      state.activeText = state?.remainingText
    }
  }

  const fontSize = size.subtractX(10).subtractY(30)
  const silverFont = useNewComponent(() => SystemFont({name: 'Silver', size: 36 }))
  const silverTextBox = useNewComponent(() => TextBox({font: silverFont, lineHeight: 24, size: fontSize }))
  const nextPageLabel = useNewComponent(() => Label({font: silverFont, text: '▼' }))

  useType(TextPager);
  useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
      position
    })
  );
  useDraw(context => {
    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.strokeRect(0, 0, size.x, size.y);

    state = { ...state, ...silverTextBox.drawText(context, state.activeText, {x: 10 , y: 10}) }
    if (!state.didTextFit) nextPageLabel.draw(context, {x: size.x - 30, y: size.y - 30 })
  });

  const mouse = useNewComponent(Mouse);
  mouse.onClick(nextPage);
}

interface TextPagerParams {
  text: string
  position: Vector
  size: Vector
}
