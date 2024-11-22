import * as DialogPrimitive from "@radix-ui/react-dialog";

type DropdownMenuTriggerElement = React.ElementRef<
  typeof DialogPrimitive.Trigger
>;
export function DropdownMenuDialog({
  children,
  dropdownMenuTriggerRef,
}: {
  children: React.ReactNode;
  dropdownMenuTriggerRef: React.RefObject<DropdownMenuTriggerElement>;
}) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger
        ref={dropdownMenuTriggerRef}
        className="invisible"
      >
        <div />
      </DialogPrimitive.Trigger>
      {children}
    </DialogPrimitive.Root>
  );
}

export function ShowDialog(
  dropdownMenuTriggerRef: React.RefObject<DropdownMenuTriggerElement>,
) {
  (dropdownMenuTriggerRef?.current as HTMLElement)?.click();
}
