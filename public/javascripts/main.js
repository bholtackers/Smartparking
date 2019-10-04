module.exports = {
    testlog: function (data) {
        try {
            var jsonData = JSON.parse(data);
        } catch (error) {
            return;
        }
        return console.log(jsonData);
    },
  };