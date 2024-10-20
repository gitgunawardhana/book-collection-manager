import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const useToast = (error: string | null) => {
  
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: mode? 'dark':'light',
      });
    }
  }, [error, mode]);
};

export default useToast;
