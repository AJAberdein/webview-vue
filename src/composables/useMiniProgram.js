import { onMounted } from "vue";
import mitt from "mitt";

const emitter = mitt();
const MINI_PROGRAM_SCRIPT_SRC = "https://appx/web-view.min.js";

export const useMiniProgram = () => {

  onMounted(() => {
    if (document.querySelector(`script[src="${MINI_PROGRAM_SCRIPT_SRC}"]`)) return

    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = MINI_PROGRAM_SCRIPT_SRC
    script.async = true;
    document.head.appendChild(script)

    script.onload = () => {
      if (!window.my) return;
      window.my.onMessage = (action) => {
        emitter.emit("onMessage", action)
      };
    };
  });

  const postMessage = (type, detail) => {
    if (!window.my) return;
    window.my.postMessage({
      action: {
        type,
        detail,
      },
    });
  };

  const onMessage = (callback) => {
    emitter.on("onMessage", callback)    
  };

  return {
    postMessage,
    onMessage,
  };
};
