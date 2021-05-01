# forkify

Configurazione cluster use case 2:

-   POD di front-end = container frontend
-   POD di backend = container backend
-   POD di autenticazione = container auth
-   Service per POD di front-end
-   Service per POD di back-end
-   Service per POD di auth
-   PersistentVolume per i logs di backend
-   Claim per accesso a PersistentVolume
-   Configmap per le variabili di ambiente
