import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { z } from 'zod';
import { ComponentRegistry } from '@/components/ui/ui-builder/types';
import { KnobPercentage } from "./KnobPercentage"

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
    <div className={cn("border rounded-lg p-4 bg-card", className)}>
      <div className="flex items-center gap-3 flex-col">
        <Slider orientation="vertical" />
        {Array(buttonCount).fill(0).map((element, index) => {
          return <Button key={`b${index}`}>{`Button ${index}`}</Button>
        })}
      </div>
      {children && (
        <div className="mt-3 pt-3 border-t">
          {children}
        </div>
      )}
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
    from: "app/platform/demo-components",
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
    from: "app/platform/demo-components",
    defaultVariableBindings: [
    ],

  }
};
