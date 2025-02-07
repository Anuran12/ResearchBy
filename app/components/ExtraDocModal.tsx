import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";

interface ExtraDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
  plan: string;
  extraDocCost: number;
}

export default function ExtraDocModal({
  isOpen,
  onClose,
  onPurchase,
  plan,
  extraDocCost,
}: ExtraDocModalProps) {
  const isFree = plan === "free";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  {isFree ? "Upgrade Plan" : "Purchase Extra Document"}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {isFree
                      ? "You are currently on the free plan. Upgrade to get more documents and features!"
                      : `You have used all your credits for this month. Would you like to purchase an extra document for $${extraDocCost}?`}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  {isFree ? (
                    <Link href="/research/plans" className="w-full">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                        onClick={onClose}
                      >
                        View Plans
                      </button>
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="flex-1 inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                        onClick={onPurchase}
                      >
                        Purchase
                      </button>
                      <button
                        type="button"
                        className="flex-1 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
