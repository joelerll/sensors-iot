"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "admin_admin",
          avatar: "",
          password:
            "$2b$10$6KlyCEuYQPrqr2ZQpRzUS.qOO6xKl21Xa3FfdrpBHGXfZu9jxnIsO", // s0/P4$$w0rD
          first_name: "Admin",
          last_name: "Admin",
          email: "",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("People", null, {
      where: { username: "admin_admin" },
    });
  },
};
