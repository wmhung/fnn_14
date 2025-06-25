import Image from 'next/image';
import { signInAction2 } from '../_lib/actions';

function SignInButton2() {
  return (
    <>
      <form className='flex flex-col' action={signInAction2}>
        <button className='flex items-center justify-center text-base aspect-[6/1] bg-slate-100 py-1 px-3 w-60 mt-3 rounded-sm shadow-md border dark:bg-slate-800 hover:bg-accent-300 hover:text-slate-50 dark:hover:bg-accent-300 dark:border-slate-100'>
          <Image
            src='https://authjs.dev/img/providers/github.svg'
            alt='Github logo'
            height='24'
            width='24'
            className='mr-3'
          />
          <span>Continue with GITHUB</span>
        </button>
      </form>
    </>
  );
}

export default SignInButton2;
