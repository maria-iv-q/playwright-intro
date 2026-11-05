import {expect, type Locator, test} from "@playwright/test";

test.describe ("Shop tests", () => {
    let fullNameInput:Locator;
    let placeOrderBtn: Locator;

        test.beforeEach (async ({ page }) => {
        await page.goto ("https://shop.tl-academy.ee/checkout")
        fullNameInput = page.getByTestId("name-input");
        placeOrderBtn = page.locator ("button.place"); //это означает, что я пытаюсь найти компонент кнопка, вот этот button, но у которого есть класс place
    })

    //critical with delivery method
    test('TL-16-4 place order button test with delivery check', async ({page}) => {
        const emailInput = page.getByPlaceholder("Email address");
        const deliveryMethodParcelCheckbox = page.getByTestId("delivery-parcel-locker-option");
        const deliveryMethodHomeCheckbox = page.getByTestId("delivery-home-option"); //checkbox достаем только через label
        const deliveryCost = page.getByTestId("summary-delivery");
        const totalSum = page.locator("#total"); //решетка означает сокращенную запись id="total"
        const orderMessage = page.getByTestId("order-message");

        const testData = {
            parcelLockerDeliveryCost: "€3.99",
            homeDeliveryCost: "€5.99",
            totalWithParcelDelivery: "€82.99",
            totalWithHomeDelivery: "€84.99",
            orderPlacedMessage: "Order placed. Thank you!"
        };

        await emailInput.fill("test@test.test");
        await fullNameInput.fill("Test Test");

        await deliveryMethodHomeCheckbox.check ();
        await expect (deliveryMethodHomeCheckbox).toBeChecked()
        await expect (deliveryCost).toHaveText(testData.homeDeliveryCost);
        await expect (totalSum).toHaveText(testData.totalWithHomeDelivery);

        await deliveryMethodParcelCheckbox.check ();
        await expect (deliveryMethodParcelCheckbox).toBeChecked()
        await expect (deliveryCost).toHaveText(testData.parcelLockerDeliveryCost);
        await expect (totalSum).toHaveText(testData.totalWithParcelDelivery);

        await placeOrderBtn.click();
        await expect (orderMessage).toBeVisible ();
        await expect (orderMessage).toHaveText ("Order placed. Thank you!")

    });

    // negative full name validation
    test('TL-16-5 full name field validation', async ({page}) => {
        const fullNameError = page.getByTestId("name-error");
        const testData = {
            fullNameErrorMessage: "Enter your first and last name separated by a space, for example Anna Tamm"
        }
        await fullNameInput.fill("TestTest");
        await fullNameInput.blur();
        await expect (fullNameError).toBeVisible();
        await expect (fullNameError).toHaveText(testData.fullNameErrorMessage)

})
    })