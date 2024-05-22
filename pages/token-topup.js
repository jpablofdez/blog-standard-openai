import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from '../components/AppLayout';
import { getAppProps } from '../utils/getAppProps';

export default function TokenTopup() {
  const handleClick = async () => {
    const result = await fetch(`/api/addTokens`, {
      method: 'POST',
    });
    const json = await result.json();
    console.log('result: ', json);
    window.location.href = json.session.url;
    /**
      method: 'POST',
    });
    const json = await result.json();
    console.log('RESULT: ', json);
    window.location.href = json.session.url;
    */
  };

    return (
      <div class="relative">
        <div class="px-14">
         <h3>Load the token topup</h3>
         </div>

        <div class="flex">

        <div class="flex-none w-14 h-14 ...">
        </div>
        <div class="grow h-14 ...">
        <button className="btn" onClick={handleClick}>
                 Add tokens
               </button>
        </div>
        <div class="flex-none w-14 h-14 ...">
       
        </div>
        </div>
    </div>

    );
  }
  TokenTopup.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>;
  };

  export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
      const props = await getAppProps(ctx);
      return {
        props,
      };
    },
  });