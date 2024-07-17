import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <Head>
        <title>My Todo App</title>
        <meta name="description" content="My Todo App Description" />
        <link rel="icon" href="https://scontent.fkkc2-1.fna.fbcdn.net/v/t1.6435-9/134091691_2797904010484571_487725024733822038_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=LyUeSD2oSAoQ7kNvgGYR1jD&_nc_ht=scontent.fkkc2-1.fna&oh=00_AYDybeGtNfM_q39ZpjbBoTmOf_ixXKPm8iX-BXzfjUc72g&oe=66BEDB82" />
      </Head>
      <main className="flex flex-col justify-center items-center space-y-8">
        <img
          src="https://scontent.fkkc2-1.fna.fbcdn.net/v/t1.6435-9/134091691_2797904010484571_487725024733822038_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=LyUeSD2oSAoQ7kNvgGYR1jD&_nc_ht=scontent.fkkc2-1.fna&oh=00_AYDybeGtNfM_q39ZpjbBoTmOf_ixXKPm8iX-BXzfjUc72g&oe=66BEDB82"
          alt="DJ_SuperStar"
          className="w-36 rounded-lg shadow-lg"
        />
        <div className="max-w-xl mx-auto">
          <img
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--15E_6diM--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://developer.mongodb.com/images/social/open-graph/og-nextjs.png"
            alt="Trump Coin"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Register
          </button>
        </div>
      </main>
    </div>
  );
}
