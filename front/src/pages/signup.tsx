export default function Signup() {
    return (
        <div className="auth-form">
            <h1 className="auth-form-header">Signup</h1>
            <div className="form-group">
                <label>Name </label>
                <input type="text" />
            </div>
            <div className="form-group">
                <label>Email </label>
                <input type="text" />
            </div>
            <div className="form-group">
                <label>Password </label>
                <input type="password" />
            </div>
            <div className="form-group">
                <label>Comfirm password </label>
                <input type="password" />
            </div>
            <div className="form-group">
                <button className="btn-light">Signup</button>
            </div>
        </div>
    )
}