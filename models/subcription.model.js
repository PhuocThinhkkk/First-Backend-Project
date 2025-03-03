import mongoose from "mongoose";

const subcriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "subcription name is required"],
        strim: true,
        minLength: [ 3, "subcription name must be at least 3 characters long"],
        maxLength: [ 50, "subcription name must be at most 50 characters long"],
    },
    price: {
        required: true,
        type: Number,
    },
    currency: {
        type: String,
        required: true,
        enum: [ "vnd","usd","eur", "gbp"],
    },
    frequence: {
        type: String,
        required: true,
        enum: [ "daily","weekly","monthly", "yearly"],
    },
    category: {
        type: String,
        required: true,
        enum: [ "basic","standard", "premium"],
    },
    status: {
        type: String,
        enum: [ "active","inactive"],
    },
    startDate: {
        type: Date,
        required: true,
        valiDate: {
            validator: function(v) {
                return v <= new Date();
            },
            message: "start date must be in the past",
        },

    },
    renewalDate: {
        type: Date,
        required: true,
        valiDate: {
            validator: function(v) {
                return v >= this.startDate;
            },
            message: "renew date must be after start date",
        },
    },
}
,{
    timestamps: true,
});

// Auto generate renewal date if its missing
subcriptionSchema.pre("save", function(next) {
    if (!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequence]);
    }
// Auto generate status based on renewal date
    if (this.renewalDate < new Date()) {
        this.status = "inactive";
        
    }
    next();
});

const Subcription = mongoose.model("Subcription", subcriptionSchema);

export default Subcription;