import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function Modal({ isOpen, close, title, children }) {
  return (
    <>
      {/* <Button
        onClick={open}
        className="rounded-md bg-black/20 !py-2 !px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Open dialog
      </Button> */}

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center !p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white shadow-2xl !p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className="text-base/7  font-bold text-[blueviolet] text-[1.4rem] "
                >
                  {title}
                </DialogTitle>
              )}

              <div className="!mt-4">
                {/* <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 !py-1.5 !px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Got it, thanks!
                </Button> */}
                {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
