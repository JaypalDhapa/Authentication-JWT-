exports.otpTemplate = (otp) =>{
    return `
    
    <div style="
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        padding: 40px;
    ">

        <div style="
            max-width: 500px;
            background: white;
            padding: 30px;
            margin: auto;
            border-radius: 10px;
            text-align: center;
        ">

            <h2 style="color: #333;">
                Email Verification
            </h2>

            <p style="color: #555;">
                Use the OTP below to verify your email address
            </p>

            <div style="
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 5px;
                margin: 20px 0;
                color: #007bff;
            ">
                ${otp}
            </div>

            <p style="color: #999;">
                This OTP is valid for 5 minutes
            </p>

        </div>

    </div>

    `;
}
