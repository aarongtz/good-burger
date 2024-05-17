import { getCustomServerSession } from '@/util';
import { redirect } from "next/navigation";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const ComponentWithAuth: React.FC<P> = async(props) => {
        const session = await getCustomServerSession();
        if(!session) {
            redirect('/sign-in');
        }

        return <WrappedComponent {...props} />;
    };

    return ComponentWithAuth;
};

export default withAuth;