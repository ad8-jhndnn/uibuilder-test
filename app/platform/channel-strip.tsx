import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { z } from 'zod';
import { ComponentRegistry } from '@/components/ui/ui-builder/types';
import { KnobPercentage } from "./KnobPercentage"
import { Grid } from "@/components/ui/ui-builder/components/grid"

interface ChannelStripProps {
  className?: string;
  children?: React.ReactNode;
  name: string;
  buttonCount: number;
}


export const ChannelStrip: React.FC<ChannelStripProps> = ({
  className,
  children,
  name,
  buttonCount
}) => {
  return (
 <div className="p-2 flex flex-col items-center h-dvh bg-gradient-to-br from-gray-800 to-gray-950">
      <KnobPercentage label="send" theme="sky" />
      <KnobPercentage label="freq" theme="sky" />
      <KnobPercentage label="balance" theme="pink" />
      <Grid columns="2" autoRows="none" justify="start" align="start" className="w-max" templateRows="none" gap={0}>
        <Button variant="destructive" size="default" className="w-max">
          <span className="">
            {"A"}
          </span>
        </Button>
        <Button variant="secondary" size="default" className="w-max">
          <span className="">
            {"B"}
          </span>
        </Button>
        <Button variant="default" size="default" className="w-max">
          <span className="">
            {"C"}
          </span>
        </Button>
        <Button variant="default" size="default" className="w-max">
          <span className="">
            {"D"}
          </span>
        </Button>
      </Grid>
      <Slider orientation="vertical" className="h-4" />
    </div>
  );
}

// Registry definitions with immutable bindings
export const demoComponentRegistry: ComponentRegistry = {
  ChannelStrip: {
    component: ChannelStrip,
    schema: z.object({
      name: z.string().default("A Strip"),
      buttonCount: z.coerce.number().default(4),
    }),
    from: "app/platform/channel-strip",
    defaultVariableBindings: [
    ],
  },
  Knob: {
    component: KnobPercentage,
    schema: z.object({
      label: z.string().default("some"),
      theme: z
        .enum([
          "stone",
          "pink",
          "sky",
          "green",
        ])
        .default("sky"),
    }),
    from: "app/platform/KnobPercentage",
    defaultVariableBindings: [
    ],

  }
};
