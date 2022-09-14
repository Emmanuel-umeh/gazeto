import {
  BadgeCheckIcon,
  LockClosedIcon,
  KeyIcon,
} from "@heroicons/react/outline";
import Head from "next/head";
const features = [
  {
    name: "Interoperable",
    description:
      "This example writing can make articles accessible across contracts and chains. It create could be the basis for creating an ecosystem around long-form articles that are not dependent on single projects but share content.      ",
    icon: KeyIcon,
  },
  {
    name: "Ownable",
    description:
      "Users can own their content and store it in an immutable way, not dependent on any centralized social media platform for keeping their content online. It also allows owners to sell their content to supporters.",
    icon: BadgeCheckIcon,
  },
  {
    name: "NFT Metadata Standard",
    description:
      "The standard used as an example here is compatible with the <a href='https://validator.w3.org/feed/docs/rss2.html' class='underline'>RSS 2.0 format</a> and <a href='https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md' class='underline'>the official ERC721 metadata standard</a>. <a href='https://pastebin.com/21aE6iKh' class='underline'>See example for metadata JSON</a>",
    icon: LockClosedIcon,
  },
];

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Welcome to Gazeto - A publishing platform</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-16 sm:pb-24">
          <main className="mt-36 mx-auto max-w-7xl px-4 sm:mt-36">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Gazeto</span>{" "}
                {/* <span className="block text-indigo-600 xl:inline">online business</span> */}
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                This is a demo client for implementing an NFT metadata standard
                for long-form writing. In this example the standard allows users
                to publish and access articles as NFTs. We believe that NFT
                metadata standards can create a shared, interoperable content
                layer for Web3.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="nft-explorer"
                    className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    View Feed
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a
                    href="create-nft"
                    className="text-nftcerts-primary w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md bg-white hover:bg-gray-200 md:py-4 md:text-lg md:px-10"
                  >
                    Publish Article
                  </a>
                </div>
              </div>
            </div>
          </main>

          <div className="relative bg-grey-50 py-16 sm:py-24 lg:py-40">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <div className="mt-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature) => (
                    <div key={feature.name} className="pt-6">
                      <div className="flow-root bg-white rounded-lg px-6 pb-8">
                        <div className="-mt-6">
                          <div>
                            <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                              <feature.icon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                            {feature.name}
                          </h3>
                          <p
                            className="mt-5 text-base text-gray-500"
                            dangerouslySetInnerHTML={{
                              __html: feature.description,
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
