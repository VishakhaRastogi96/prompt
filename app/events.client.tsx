export const promptUserOnAndroid = () => {
  console.log("Prompt app banner");

  // Check if the beforeinstallprompt event is supported by the browser
  if ("onbeforeinstallprompt" in window) {
    // Add an event listener to the beforeinstallprompt event
    window.addEventListener(
      "beforeinstallprompt",
      (event) => {
        // Prevent the default behavior of the event
        event.preventDefault();

        console.log("Before install prompt event triggered");

        // Store the event for later use
        let deferredPrompt: any = event;

        // Add a click event to trigger the installation prompt
        window.addEventListener(
          "click",
          () => {
            // Show the installation prompt by calling prompt() on the deferredPrompt
            deferredPrompt.prompt();

            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then(
              (choiceResult: { outcome: string }) => {
                if (choiceResult.outcome === "accepted") {
                  console.log("User accepted the installation prompt");
                } else {
                  console.log("User dismissed the installation prompt");
                }
                // Clear the reference to the deferredPrompt
                deferredPrompt = null;
              }
            );
          },
          { once: true }
        );
      },
      { once: true }
    );
  }
};
