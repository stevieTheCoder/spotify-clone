import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react";
import PropTypes from "prop-types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const { callbackUrl } = context.query;

  return {
    props: {
      providers,
      callbackUrl: callbackUrl ?? "/",
    },
  };
}

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
  callbackUrl: string
}

export const Login: React.FC<Props> = ({ providers, callbackUrl }) => {
 
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black">
      <img
        className="mb-5 w-52"
        src="https://links.papareact.com/9xl"
        alt="spotify logo"
      />

      
      {providers == null ? null : Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

Login.propTypes = {
  providers: PropTypes.any,
  callbackUrl: PropTypes.string.isRequired,
};

export default Login;