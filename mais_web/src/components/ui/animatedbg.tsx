'use client';

import { cn } from "../utils/utils";
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  Children,
  useEffect,
  useState,
  useId,
} from 'react';
import type { ReactElement } from 'react';

// Create a type for the props that will be passed to the child elements
type ChildElementProps = {
  'data-id': string;
  className?: string;
  children?: React.ReactNode;
};

// Create a type for the combined props that will be applied to the child elements
type CombinedProps = ChildElementProps & {
  key?: React.Key;
  'data-checked': string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
};

export type AnimatedBackgroundProps = {
  children:
    | ReactElement<ChildElementProps>[]
    | ReactElement<ChildElementProps>;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: {
    duration?: number;
    ease?: number[] | string;
  };
  enableHover?: boolean;
};

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition = { duration: 0.3 },
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);
    if (onValueChange) onValueChange(id);
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      {Children.map(children, (child, index) => {
        // Cast child to ReactElement to access its props
        const childElement = child as ReactElement<ChildElementProps>;
        const id = childElement.props['data-id'];

        const interactionProps = enableHover
          ? {
              onMouseEnter: () => handleSetActiveId(id),
              onMouseLeave: () => handleSetActiveId(null),
            }
          : {
              onClick: () => handleSetActiveId(id),
            };

        // Create props object with appropriate types
        const props: CombinedProps = {
          ...childElement.props,
          key: index,
          className: cn('relative inline-flex', childElement.props.className),
          'data-checked': activeId === id ? 'true' : 'false',
          ...interactionProps,
        };

        // Use type assertion for cloneElement to avoid TypeScript errors
        return React.cloneElement(
          childElement,
          // Use type assertion to convince TypeScript this is valid
          props as React.ClassAttributes<unknown> & ChildElementProps,
          <>
            <AnimatePresence initial={false}>
              {activeId === id && (
                <motion.div
                  layoutId={`background-${uniqueId}`}
                  className={cn('absolute inset-0', className)}
                  transition={transition}
                  initial={{ opacity: defaultValue ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <div className="z-10">{childElement.props.children}</div>
          </>
        );
      })}
    </>
  );
}