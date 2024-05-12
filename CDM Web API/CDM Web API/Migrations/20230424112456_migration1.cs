using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CDM_Web_API.Migrations
{
    /// <inheritdoc />
    public partial class migration1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    gstin = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    cname = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    logo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    typeOfCompany = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    headquarter = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    phoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    website = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    countryCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.gstin);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    accountId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    latitude = table.Column<double>(type: "float", nullable: false),
                    longitude = table.Column<double>(type: "float", nullable: false),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    gstin = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    accountName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phoneNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    yearOfEst = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    operatingHours = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    manager = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    servicesOffered = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    expenses = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    profit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    revenue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    noOfDept = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    noOfEmp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.email);
                    table.ForeignKey(
                        name: "FK_Accounts_Customers_gstin",
                        column: x => x.gstin,
                        principalTable: "Customers",
                        principalColumn: "gstin");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_gstin",
                table: "Accounts",
                column: "gstin");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
