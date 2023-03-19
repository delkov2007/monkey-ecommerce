import { Spin } from "antd";

const Spinner = ({ size }) => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <Spin size={size || 'large'} />
                </div>
            </div>
        </div>
    );
};

export default Spinner;