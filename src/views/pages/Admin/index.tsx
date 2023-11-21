import { Link, Outlet } from "react-router-dom";

const AdminRoot = () => {
    return (
        <div className="w-full lg:max-w-4xl xl:max-w-6xl mx-auto flex-col">
            <Link className="mx-auto my-4 text-4xl font-bold" to="/admin">
                Admin Dashboard
            </Link>

            <div className="px-4 py-2 rounded-xl flex gap-3 justify-between items-center bg-primary">
                <Link
                    className="text-white text-lg font-semibold"
                    to="/admin/profile"
                >
                    Thiết lập hồ sơ
                </Link>
                <Link
                    className="text-white text-lg font-semibold"
                    to="/admin/accounts"
                >
                    Quản lý tài khoản
                </Link>
                <Link
                    className="text-white text-lg font-semibold"
                    to="/admin/products"
                >
                    Quản lý sản phẩm
                </Link>
                <Link
                    className="text-white text-lg font-semibold"
                    to="/admin/orders"
                >
                    Quản lý đơn hàng
                </Link>
            </div>

            <Outlet />
        </div>
    );
};

export default AdminRoot;
