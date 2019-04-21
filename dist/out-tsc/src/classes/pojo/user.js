var User = /** @class */ (function () {
    function User(id, email, name, surname, country, state, city, address, phone, dni, type) {
        if (id === void 0) { id = null; }
        if (email === void 0) { email = null; }
        if (name === void 0) { name = null; }
        if (surname === void 0) { surname = null; }
        if (country === void 0) { country = null; }
        if (state === void 0) { state = null; }
        if (city === void 0) { city = null; }
        if (address === void 0) { address = null; }
        if (phone === void 0) { phone = null; }
        if (dni === void 0) { dni = null; }
        if (type === void 0) { type = null; }
        this.id = id;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.country = country;
        this.state = state;
        this.city = city;
        this.address = address;
        this.phone = phone;
        this.dni = dni;
        this.type = type;
    }
    User.fromArray = function (array) {
        console.log(array);
        console.log(User);
        var tmp = new User();
        Object.keys(array).forEach(function (key) {
            var val = array[key];
            if (tmp.hasOwnProperty(key)) {
                tmp[key] = val;
            }
        });
        return tmp;
    };
    return User;
}());
export { User };
//# sourceMappingURL=user.js.map