"use client";
import React from "react";
import Image from "next/image";

export const Docs = () => {
  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-6">
      {/* Webhook Section */}
      <h1 className="font-bold text-2xl ">- Webhook</h1>

      {/* Step 1: Create a Webhook */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900">Step 1: Create a Webhook</h2>
        <p className="mt-2 text-gray-700">
          Begin by creating a webhook using the <em>"Add Webhook"</em> modal.
        </p>
      </div>

      {/* Step 2: Obtain the Webhook URL */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900">Step 2: Obtain the Webhook URL</h2>
        <p className="mt-2 text-gray-700">
          To retrieve the webhook URL, navigate to the <em>"Webhook List"</em> page and click on the view icon next to the desired webhook.
        </p>
      </div>

      {/* Template Section */}
      <h1 className="font-bold text-2xl">- Template</h1>

      {/* Step 1: Create a Template */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900">Step 1: Create a Template</h2>
        <p className="mt-2 text-gray-700">
          Begin by creating a template using the <em>"Add Template"</em> modal.
        </p>
      </div>

      {/* Step 2: How to Create a Template */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900">How to Create a Template</h2>
        <p className="mt-2 text-gray-700">
          <b>Name:</b> Type any name you want
        </p>
        <p className="mt-2 text-gray-700">
          <b>Opening Template:</b>
        </p>
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow">
          <pre className="font-mono whitespace-pre-wrap">
            <code>
              🚨 Trade Alert 🚨{"\n"}
              💼 Order: {"{{action}}"}{"\n"} 
              📊 Contracts: {"{{contracts}}"}{"\n"}
              📈 Symbol: {"{{basecurrency}}"}{"\n"}
              💰 Price: {"{{close}}"}{"\n"}
              ⏱️ Timeframe: {"{{interval}}"}{"\n"}
              ⏳ Estimated Duration: {"5-6 Days"}
            </code>
          </pre>
        </div>

        <p className="mt-2 text-gray-700">
          <b>Closing Template:</b>
        </p>
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow ">
          <pre className="font-mono whitespace-pre-wrap">
            <code>
              🚨 Trade Alert 🚨{"\n"}
              💼 Order: {"{{action}}"}{"\n"} 
              📊 Contracts: {"{{contracts}}"}{"\n"}
              📈 Symbol: {"{{basecurrency}}"}{"\n"}
              💰 Price: {"{{close}}"}{"\n"}
              ⏱️ Timeframe: {"{{interval}}"}{"\n"}
              📊 Profit/Loss: {"{{profitLoss}}"}
            </code>
          </pre>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500 mt-4">
          <p className="text-yellow-800">
            ⚠️ <b>Note:</b>
            <code className="bg-yellow-100 text-orange-700 px-2 py-1 rounded">
            {"{{profitLoss}}"}
            </code>{" "}
            is mandatory in the closing template to calculate the overall price
          increase or decrease. Ensure this key is included to accurately
          reflect the trade's final results.
          </p>
        </div>
      </div>

      {/* Mapping Section */}
      <h1 className="font-bold text-2xl">- Mapping</h1>

      <div className="flex flex-col gap-6">
        <p className="text-lg">
          To create a mapping, follow these steps:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">
            Step 1: Select a Webhook
          </h2>
          <p className="mt-2 text-gray-700">
            Select the webhook you want from the <b>Webhook Dropdown</b>.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">
            Step 2: Select a Template
          </h2>
          <p className="mt-2 text-gray-700">
            Select the template you want from the <b>Template Dropdown</b>.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">
            Step 3: Create an Alert
          </h2>
          <p className="mt-2 text-gray-700">
            Create an alert with the following format:
          </p>
          <div className="bg-gray-900 text-white p-4 rounded-lg shadow">
            <pre className="font-mono whitespace-pre-wrap">
              <code>
AGLD-1H: order buy @ 1582.635 filled on AGLDUSDT.P. Symbol = AGLD   price =
                1.5815, Timefame = 60
              </code>
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">
            Step 4: Create an Alert Token
          </h2>
          <p className="mt-2 text-gray-700">
            Create an alert token with the following format:
          </p>
          <div className="bg-gray-900 text-white p-4 rounded-lg shadow">
            <pre className="font-mono whitespace-pre-wrap">
              <code>
                {"{{nameId}}"}: order {"{{action}}"} @ {"{{contracts}}"} filled
                on {"{{ticker}}"}. Symbol = {"{{basecurrency}}"}   price = {"{{close}}"}, Timefame = {"{{interval}}"}
              </code>
            </pre>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-yellow-800">
            ⚠️ <b>Note:</b>
            <code className="bg-yellow-100 text-orange-700 px-2 py-1 rounded">
            {"{{nameId}}"}
            </code>{" "}
             is required for the alert token to have a unique value in order to calculate the overall percentage increase.</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-yellow-800">
            ⚠️ Note:
            Make sure the alert matches the alert token exactly, including spaces and formatting.</p>
        </div>

       

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">
            Step 5: Create Mapping JSON
          </h2>
          <p className="mt-2 text-gray-700">
            The system will create a mapping JSON from the alert tokens and
            convert it to the following JSON format:
          </p>
          <div className="bg-gray-900 text-white p-4 rounded-lg shadow">
            <pre className="font-mono whitespace-pre-wrap">
              <code>
                {`{
  "nameId": "nameId",
  "action": "action",
  "contracts": "contracts",
  "ticker": "ticker",
  "basecurrency": "basecurrency",
  "close": "close",
  "interval": "interval"
}`}
              </code>
            </pre>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-yellow-800">
            ⚠️ <b>Note:</b> - Keys in the mapping JSON must exactly match the
            template tokens without dots. - Ensure the tokens in the template
            are defined in a direct way, e.g.,{" "}
            <code className="bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded">
              action
            </code>{" "}
            instead of{" "}
            <code className="bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded">
              anything.action
            </code>
          </p>
        </div>
        <Image
            src="/map.png" // path to the image in the public folder
            alt="mapping image"
            width={1000}
            height={300}
            className="rounded-md"
          />


      </div>
    </div>
  );
};