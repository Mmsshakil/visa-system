import paypalicon from '../assets/payments/PayPal.png'
import appleicon from '../assets/payments/Apple.png'
import usdticon from '../assets/payments/usdtimg.png'
import bkashicon from '../assets/payments/Bkash.png'
import nagadicon from '../assets/payments/Nagad.png'

const Payment = ({ selectedPayment, bkashAmount, othersAmount }) => {
    return (
        <div>
            {/* paypal */}
            {
                selectedPayment === "Paypal" && <div className="flex flex-col gap-0 items-center justify-center">
                    <div className="flex gap-0 items-center justify-center">
                        <figure className="w-24"><img className="" src={paypalicon} alt="profilepic" /></figure>
                        <h1 className="text-sm md:text-lg font-bold">- jerek@love4mee.com</h1>
                    </div>

                    <div className=" text-sm md:text-base">
                        <ol className="list-decimal">
                            <li>Sent <span className="font-bold text-blue-700">${othersAmount}</span> to the PayPal account address.</li>
                            <li>Must be sent on <span className="font-bold text-blue-700">&apos;&apos;Friends and Family&apos;&apos;</span> option.</li>
                            <li>Enter the <span className="font-bold text-blue-700">TrxID</span> and click the Apply button.</li>
                        </ol>
                    </div>
                </div>
            }


            {/* bkash */}
            {
                selectedPayment === "Bkash" && <div className="flex flex-col gap-0 items-center justify-center">
                    <div className="flex gap-0 items-center justify-center">
                        <figure className="w-24"><img className="" src={bkashicon} alt="profilepic" /></figure>
                        <h1 className="text-lg font-bold">: +8801856037542</h1>
                    </div>

                    <div className="text-sm md:text-base">
                        <ol className="list-decimal">
                            <li>Sent <span className="font-bold text-blue-700">{bkashAmount}/= tk</span> to the BKash account number.</li>
                            <li>This is a <span className="font-bold text-blue-700">&apos;&apos;Personal&apos;&apos;</span> account number.</li>
                            <li>Enter the <span className="font-bold text-blue-700">TrxID</span> and click the Apply button.</li>
                            <li>You can cash in on this number from any agent.</li>
                            <li className=" text-red-600">Don&apos;t Cashout or Merchant payment</li>
                        </ol>
                    </div>
                </div>
            }


            {/* nagad */}
            {/* {
                            selectedPayment === "Nagad" && <div className="flex flex-col gap-0 items-center justify-center">
                                <div className="flex gap-0 items-center justify-center">
                                    <figure className="w-24"><img className="" src={nagadicon} alt="profilepic" /></figure>
                                    <h1 className="text-lg font-bold">: +8801712345678</h1>
                                </div>

                                <div className="">
                                    <ol className="list-decimal">
                                        <li>Sent <span className="font-bold text-blue-700">17100/= tk</span> to the Nagad account number.</li>
                                        <li>This is a <span className="font-bold text-blue-700">&apos;&apos;Personal&apos;&apos;</span> account number.</li>
                                        <li>Enter the <span className="font-bold text-blue-700">TrxID</span> and click the Apply button.</li>
                                        <li className=" text-red-600">Don&apos;t Cashout or Merchant payment</li>
                                    </ol>
                                </div>
                            </div>
                        } */}

            {/* apple */}
            {
                selectedPayment === "ApplePay" && <div className="flex flex-col gap-0 items-center justify-center mt-3">
                    <div className="flex gap-0 items-center justify-center">
                        <figure className="w-20"><img className="" src={appleicon} alt="profilepic" /></figure>
                        <div className="text-sm md:text-lg font-bold">
                            <h1 >: +17024188580</h1>
                            <h1 >: aalynarae@icloud.com</h1>
                        </div>
                    </div>


                    <div className="text-sm md:text-base">
                        <ol className="list-decimal">
                            <li>Sent <span className="font-bold text-blue-700">${othersAmount}</span> to the Apply Pay Number or Mail.</li>
                            <li>Must be sent from <span className="font-bold text-blue-700">&apos;&apos;Apple Cash&apos;&apos;</span>.</li>
                            <li>Enter your <span className="font-bold text-blue-700">Apple Pay Number</span> and click the Apply button.</li>
                        </ol>
                    </div>
                </div>
            }


            {/* usdt */}
            {
                selectedPayment === "USDT" && <div className="flex flex-col gap-0 items-center justify-center mt-3">
                    <div className="flex flex-col gap-0 items-center justify-center mb-2">
                        <figure className="w-80"><img className="" src={usdticon} alt="profilepic" /></figure>
                        <h1 className="text-lg font-bold">Address</h1>
                        <h1 className="text-base md:text-lg text-blue-700">TARDRViMtNmkWDGttFcjCMmZaJ6XDeMPNK</h1>
                    </div>


                    <div className="text-sm md:text-base">
                        <ol className="list-decimal">
                            <li>Sent <span className="font-bold text-blue-700">${othersAmount}</span> to the USDT address or scan QR code.</li>
                            <li>Must be sent by <span className="font-bold text-blue-700">Tron (TRC20)</span> network.</li>
                            <li>Check the wallet address carefully.</li>
                        </ol>
                    </div>
                </div>
            }
        </div>
    );
};

export default Payment;