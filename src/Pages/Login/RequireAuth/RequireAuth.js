import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const RequireAuth = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification, sending, error] = useSendEmailVerification(
        auth
      );
    const location = useLocation();
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if(!user.emailVerified){

       return <div className="text-danger">
          
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus repudiandae optio delectus in. Enim molestias numquam, asperiores amet modi, similique inventore quam voluptatem impedit quo cum porro explicabo, quaerat quae animi consequuntur in ullam perspiciatis laudantium. Est, facilis pariatur optio quasi sint temporibus omnis reiciendis perferendis ab, rem enim eveniet.</p>
            <button
        onClick={async () => {
          await sendEmailVerification();
          toast('we have sent you verification email');
        }}
      >
  <h2>Verify Your Email</h2>
  <ToastContainer></ToastContainer>
      </button>    
        </div>
    }

    return children;
};

export default RequireAuth;