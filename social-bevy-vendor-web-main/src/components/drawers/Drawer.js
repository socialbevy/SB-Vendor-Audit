import * as DrawerPrimitive from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { cn } from '@/utils/cn';

const Drawer = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    className={cn('fixed inset-0 z-50 bg-black/80 animate-fade-in', className)}
    {...props}
    ref={ref}
  />
));
DrawerOverlay.displayName = 'DrawerOverlay';

const DrawerClose = ({ onClick, className, ...props }) => (
  <button className={cn("absolute top-4 right-4", className)} onClick={onClick} {...props}>
    <XMarkIcon className="w-6 h-6" />
    <span className="sr-only">Close</span>
  </button>
);
DrawerClose.displayName = 'DrawerClose';

const DrawerHeader = ({ children, className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props}>
    {children}
  </div>
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({ children, className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props}>
    {children}
  </div>
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerContent = React.forwardRef(({ side = 'right', title, isOpen, close, className, children, submitButton, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed overflow-y-scroll top-0 right-0 bottom-0 z-50 bg-white p-6 shadow-lg w-5/6 sm:w-3/4 sm:max-w-sm',
        'transition-transform duration-500 ease-in-out',
        isOpen ? 'animate-slide-in-from-right' : 'animate-slide-out-from-left',
        className
      )}
      {...props}
    >
      <div className="flex flex-col">
        <DrawerHeader>
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
        </DrawerHeader>
        {children}
      </div>
      <DrawerFooter>
        <DrawerClose onClick={close} />
        <button
          className="px-4 py-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
          onClick={close}
        >
          Close
        </button>
        {submitButton}
      </DrawerFooter>
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
};
