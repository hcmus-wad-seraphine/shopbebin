import Container from "@components/Container";

interface Props {}

const LogIn = () => {
    return (
        <Container isAdmin={false}>
            <div className="flex-col gap-4 px-[50px] sm:px-[150px] lg:px-[200px] xl:px-[300px] py-[50px]">
                <h2 className="font-semibold text-xl">Log In</h2>

                <div className="flex-col">
                    <p>Username or email adress</p>
                    <input
                        type="text"
                        className="flex-1 border-black border-[1px]"
                    />
                </div>

                <div className="flex-col">
                    <p>Password</p>
                    <input
                        type="text"
                        className="flex-1 border-black border-[1px]"
                    />
                </div>

                <div className="justify-between items-center flex-col sm:flex-row">
                    <div className="justify-center items-center gap-2">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded-sm border-[1px] border-black"
                        />
                        Remember me
                    </div>
                    <a>Forget password</a>
                </div>

                <a
                    href="/"
                    className="bg-secondary text-white rounded-full px-10 py-2 justify-center self-center"
                >
                    Log In
                </a>
            </div>
        </Container>
    );
};

export default LogIn;
