'use client';

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { closeModal } from '@/lib/features/modal/modalSlice';
import DeleteLocationContent from './DeleteLocationContent';
import { useDeleteLocation } from '@/lib/features/vendorLocations/useVendorLocations';
import { useSnackbar } from '@/components/notifications/Snackbar';

const ModalManager = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useSelector(state => state.modal);
  const modalRef = useRef(null);
  const { mutate: deleteLocation } = useDeleteLocation();
  const showSnackbar = useSnackbar();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(closeModal());
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (modalType) {
      case 'deleteLocation':
        return (
          <DeleteLocationContent
            deleteLocation={() => {
              deleteLocation(modalProps.locationId, {
                onSuccess: () => {
                  showSnackbar('Location deleted successfully!', 'success');
                  dispatch(closeModal());
                },
                onError: (error) => {
                  showSnackbar(error.message || 'Failed to delete location', 'error');
                }
              });
            }}
            closeModal={() => dispatch(closeModal())}
          />
        );
      // case 'another':
      //   return <AnotherModalContent />;
      default:
        return <span>No content</span>;
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4`}>
      <div
        ref={modalRef}
        className={`relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto my-0 transition-all duration-300 ease-in-out ${
          isOpen ? 'scale-100 opacity-100 animate-modalbounce' : 'scale-95 opacity-0'
        }`}
        style={{
          transition: 'transform 0.2s, opacity 0.2s',
          transformOrigin: 'center',
        }}
      >
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-2 right-2 text-black bg-transparent hover:bg-gray-200 p-2 rounded-md"
        >
          <XMarkIcon className="w-6 h-6" />
          <span className="sr-only">Close</span>
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default ModalManager;
