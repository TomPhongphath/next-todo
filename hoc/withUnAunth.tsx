import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withUnAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithUnAuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/todo');
      } 
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithUnAuthComponent;
};

export default withUnAuth;