"use client";

import React from "react";
import UIBuilder from "@/components/ui/ui-builder";
import { complexComponentDefinitions } from "@/lib/ui-builder/registry/complex-component-definitions";
import { primitiveComponentDefinitions } from "@/lib/ui-builder/registry/primitive-component-definitions";

const initialLayers = [
  {

    id: "7",
    type: "div",
    name: "Panel",
    props: {
      className: "bg-orange-100 p-1 h-dvh",
    },
    children: [
      {
        id: "1",
        type: "div",
        name: "Page",
        props: {
          className: "p-1 grid grid-cols-[max-content_1fr_max-content] grid-rows-[1fr_max-content] h-full gap-2  bg-emerald-200 h-600",
        },
        children: [
          {
            id: "2",
            type: "div",
            name: "Buttons",
            props: {
              className: "flex flex-col gap-2 justify-between",
            },
            children: [

            ],
          },
          {
            id: "4",
            type: "div",
            name: "Content",
            props: {
              className: "flex items-center justify-center",
            },
            children: [
              {
                id: "5",
                type: "div",
                name: "Stuff",
                props: {
                  className: "flex flex-1 justify-evenly items-center h-7/8  gap-20",
                },
              }
            ],
          },
          {
            id: "6",
            type: "div",
            name: "Footer",
            props: {
              className: "col-span-2 col-start-2 bg-blue-800 row-start-2 content-end text-center",
            },
            children: "Copyright Audinate 2025",
          },
        ],
      },
    ]
  }
];

    export const SimpleBuilder = () => {
      return (
        <UIBuilder
          initialLayers={initialLayers}
          persistLayerStore={false}
          componentRegistry={{
            ...complexComponentDefinitions,
            ...primitiveComponentDefinitions,
          }}
        />
      );
    }