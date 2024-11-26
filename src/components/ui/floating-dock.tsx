import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ReactNode } from 'react';

interface FloatingDockItem {
  id: string;
  title: string;
  icon: ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
  labelPosition?: 'above' | 'below';
  onItemClick?: (id: string) => void;
}

export function FloatingDock({ items, desktopClassName, mobileClassName, labelPosition = 'below', onItemClick }: FloatingDockProps) {
  return (
    <>
      <FloatingDockDesktop 
        items={items} 
        className={desktopClassName} 
        labelPosition={labelPosition} 
        onItemClick={onItemClick}
      />
      <FloatingDockMobile 
        items={items} 
        className={mobileClassName} 
        labelPosition={labelPosition} 
        onItemClick={onItemClick}
      />
    </>
  );
}

interface DockProps {
  items: {
    id: string;
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
  className?: string;
  labelPosition: "above" | "below";
  onItemClick?: (id: string) => void;
}

const FloatingDockMobile = ({ items, className, labelPosition, onItemClick }: DockProps) => {
  return (
    <div className={cn(
      "block md:hidden",
      "fixed bottom-3 left-4 right-4",
      "px-3 py-2 rounded-2xl bg-gray-50/95 dark:bg-neutral-900/95 backdrop-blur-sm",
      "shadow-lg border border-gray-200 dark:border-neutral-800",
      "max-w-screen-sm mx-auto",
      className
    )}>
      <div className="flex items-center justify-between w-full">
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.title}
            className="flex flex-col items-center justify-center gap-1"
          >
            {labelPosition === "above" && (
              <span className="text-[9px] font-medium text-gray-600 dark:text-gray-400 truncate max-w-[40px]">
                {item.title}
              </span>
            )}
            <div className="w-10 h-10 xs:w-11 xs:h-11 rounded-xl bg-gray-200/50 dark:bg-neutral-800/50 flex items-center justify-center">
              <div className="w-4 h-4 xs:w-5 xs:h-5 text-gray-700 dark:text-gray-300">
                {item.icon}
              </div>
            </div>
            {labelPosition === "below" && (
              <span className="text-[9px] font-medium text-gray-600 dark:text-gray-400 truncate max-w-[40px]">
                {item.title}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className, labelPosition, onItemClick }: DockProps) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-20 items-center rounded-2xl bg-gray-50/95 dark:bg-neutral-900/95 backdrop-blur-sm px-3",
        "shadow-lg border border-gray-200 dark:border-neutral-800",
        "max-w-2xl",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 lg:gap-3">
        {items.map((item) => (
          <IconContainer 
            mouseX={mouseX} 
            key={item.title} 
            {...item} 
            labelPosition={labelPosition}
          />
        ))}
      </div>
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  labelPosition,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  labelPosition: "above" | "below";
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 30, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 30, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link href={href} className="flex flex-col items-center gap-1 px-1">
      {labelPosition === "above" && (
        <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 truncate max-w-[50px]">
          {title}
        </span>
      )}
      <motion.div
        ref={ref}
        style={{ width, height }}
        className="aspect-square rounded-xl bg-gray-200/50 dark:bg-neutral-800/50 flex items-center justify-center"
      >
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-gray-700 dark:text-gray-300"
        >
          {icon}
        </motion.div>
      </motion.div>
      {labelPosition === "below" && (
        <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 truncate max-w-[50px]">
          {title}
        </span>
      )}
    </Link>
  );
}