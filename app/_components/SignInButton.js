import Image from 'next/image';
import { signInAction } from '../_lib/actions';

function SignInButton() {
  return (
    <>
      <form className='flex flex-col' action={signInAction}>
        <button className='flex items-center justify-center text-base aspect-[6/1] bg-slate-100 py-1 px-3 w-60 mt-5 rounded-sm shadow-md'>
          <Image
            src='https://authjs.dev/img/providers/google.svg'
            alt='Google logo'
            height='24'
            width='24'
            className='mr-3'
          />
          <span>Continue with Google</span>
        </button>
      </form>
    </>
  );
}

export default SignInButton;
