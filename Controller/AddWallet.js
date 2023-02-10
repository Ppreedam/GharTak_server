const Wallet = require("../Schema/WalletSchema");

// Add money to wallet
const addfund = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      const saveuserid = new Wallet({userId, amount})

      const store = await saveuserid.save();
      wallet.balance += +amount;
      
      return res.status(400).json({ message: "User not found  & save it" });
    } else {
      // const saveuserid = new Wallet({userId, amount})

      // const store = await saveuserid.save();
      wallet.balance += +amount;
    }

    await wallet.save();
    return res.status(200).json({ message: "Money added to wallet" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


// Deduct money from wallet

const deductfuncd = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(400).json({ message: "User not found" });
    }
    if (wallet.balance < amount) {
      return res
        .status(400)
        .json({ message: "Insufficient balance in wallet" });
    }
    wallet.balance -= amount;
    await wallet.save();
    return res.status(200).json({ message: "Money deducted from Your wallet" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// getdata fund
const getfunddata = async (req, res) => {
  console.log(req.params.userId);
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ wallet });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

}


module.exports = { addfund, deductfuncd, getfunddata }
