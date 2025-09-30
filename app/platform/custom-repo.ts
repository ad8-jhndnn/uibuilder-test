import { ComponentRegistry } from '@/components/ui/ui-builder/types';
import { ChannelStrip } from "./channel-strip"
import { KnobPercentage } from './KnobPercentage';
import  FilterCard from "./FilterCard/FilterCard"
import { Eq } from "./eq"
import { z } from 'zod';

// Registry definitions with immutable bindings
export const customComponentRegistry: ComponentRegistry = {
  ChannelStripA: {
    component: ChannelStrip,
    schema: z.object({
      name: z.string().default("A Strip"),
      buttonCount: z.coerce.number().default(4),
    }),
    from: "app/platform/channel-strip",
    defaultVariableBindings: [
    ],
  },
  KnobPercentage: {
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

  },
  Eq : {
    component: Eq,
    schema: z.object({
    }),
    from: "app/platform/eq",
    defaultVariableBindings: [
    ],
  },
  FilterCard : {
    component: FilterCard,
    schema: z.object({
    }),
    from: "app/platform/FilterCard/FilterCard",
    defaultVariableBindings: [
    ],
  }
};
