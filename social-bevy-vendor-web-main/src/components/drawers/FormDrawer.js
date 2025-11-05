import React from 'react';
import { useDisclosure } from '@/lib/hooks/useDisclosure';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
} from './Drawer';

const FormDrawer = ({ title, children, isDone, triggerButton, submitButton, defaultOpen = false }) => {
  const { isOpen, open, close } = useDisclosure(defaultOpen);

  React.useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  return (
    <Drawer open={isOpen} onOpenChange={open}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent
        isOpen={isOpen}
        title={title}
        close={close}
        submitButton={submitButton}
        className="flex max-w-[800px] flex-col justify-between sm:max-w-[540px]"
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default FormDrawer;
