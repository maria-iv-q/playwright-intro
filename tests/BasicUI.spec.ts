//positive
//проверим работу кнопки создать заказ

//negative
// имеил некорректный не дает создать заказ + появляется ошибка

//positive 2
//переключение языка


import { test, expect } from '@playwright/test';
import type {Locator} from "@playwright/test";

test.describe ("basic ui tests", () => {
    let firstNameInput: Locator;
    let lastNameInput: Locator;
    let emailInput: Locator;
    let addressInput: Locator;
    let createOrderBtn: Locator;

    test.beforeEach (async ({ page }) => {
        await page.goto ("https://basic-ui.tl-academy.ee")
        firstNameInput = page.getByTestId("first-name-input");
        lastNameInput = page.getByTestId("last-name-input");
        emailInput = page.getByTestId("email-input");
        addressInput = page.getByTestId("address-input");
        createOrderBtn = page.getByTestId ("create-order-button");
    })
    test('TL-16-1 create order button test', async () => {
        await expect(createOrderBtn).toBeDisabled();
        await firstNameInput.fill("Test");
        //await expect(createOrderBtn).toBeDisabled();
        await lastNameInput.fill("Test");
        //await expect(createOrderBtn).toBeDisabled();
        await emailInput.fill("test@test.test");
        //await expect(createOrderBtn).toBeDisabled();
        await addressInput.fill("Test");
        await expect(createOrderBtn).toBeEnabled();
    });

    test('TL-16-2 change language', async ({ page }) => {
        const langBtnRu = page.getByTestId("language-ru");
        const langBtnEn = page.getByTestId("language-en");
        const heading = page.getByTestId("page-title");

        //Перед тем как переключимся на En нужно проверить текст Ru языка
        //Note: это объект, а не массив, потому что мы не будем проверять каждый перевод
        const testData = {
            createOrderRu: "Создать заказ",
            createOrderEn: "Create order"
        };
        // Проверяем на русском
        await langBtnRu.click ();
        await expect (heading).toHaveText(testData.createOrderRu);

        //Второй вариант проверки на русском
        //Note: await внутри expect. Функция innerText, она promise, но нам IDE ничего не подсвечивает если нет await
        expect (await heading.innerText()).toBe(testData.createOrderRu);

        // Переход на En
        await langBtnEn.click ();

        //Проверяем на английском
        await expect (heading).toHaveText(testData.createOrderEn);
    });

    test('TL-16-3 incorrect email blocks create button and shows error', async ({ page }) => {const nameInput = page.getByTestId("name-input");
    const emailErrorBlock = page.getByTestId ("email-error");
    await expect(createOrderBtn).toBeDisabled();
    await firstNameInput.fill("Test");
    await lastNameInput.fill("Test");
    await addressInput.fill("Test");
    await emailInput.fill("test@test");
    await emailInput.blur() //blur - перестает фокусить поле
    await expect (emailErrorBlock).toBeVisible ();
    await expect (createOrderBtn).not.toBeEnabled();

    });
})
