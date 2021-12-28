import { getProviders, signIn } from "next-auth/react";
import PropTypes from "prop-types";

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const { callbackUrl } = context.query;

  return {
    props: {
      providers,
      callbackUrl: callbackUrl ?? "/",
    },
  };
}

export default function Login({ providers, callbackUrl }) {
  console.log(callbackUrl);
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black">
      <img
        className="mb-5 w-52"
        src="https://links.papareact.com/9xl"
        alt="spotify logo"
      />

      {Object.values(providers).map((provider) => (
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
  providers: PropTypes.object,
  callbackUrl: PropTypes.string,
};
