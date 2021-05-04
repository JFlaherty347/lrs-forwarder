# lrs-forwarder

A simple web app for securely forwarding xAPI statements to an LRS. The main use is when you are working in an environment that is exclusively front-end since that would cause the LRS endpoint and authorization information to be directly accessible to anyone. You can instead forward the xAPI data here and have the endpoint be accessed exclusively through this web app. This allows for a more secure LRS access in a limited environment.
