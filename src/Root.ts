import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Physics,
  Vector,
} from "@hex-engine/2d";
import TextScroller from "./TextPager";

const TEXT = `ZACK: Damn, is this working?
I sure hope so. Seems really cool, Right?

Zack: Yeah!
Definitely.


Zack: Yeah...`

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.fullscreen({ pixelZoom: 1 });

  useNewComponent(Physics.Engine);

  const canvasCenter = new Vector(
    canvas.element.width / 2,
    canvas.element.height / 2
  );

  useChild(() => TextScroller({
    size: new Vector(400, 24 * 6),
    position: canvasCenter,
    text: TEXT
  }))
}
