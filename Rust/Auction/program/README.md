# inspyrd NFT Auction Solana contract

- Install Rust from https://rustup.rs/
- Install Solana from https://docs.solana.com/cli/install-solana-cli-tools

### Configure CLI

> If you're on Windows, it is recommended to use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to run these commands

1. Set CLI config url to localhost cluster

```bash
solana config set --url localhost
```

2. Create CLI Keypair

If this is your first time using the Solana CLI, you will need to generate a new keypair:

```bash
solana-keygen new
```

### Start local Solana cluster

This example connects to a local Solana cluster by default.

Start a local Solana cluster:
```bash
solana-test-validator
```

### How to build program

```sh
cargo build-bpf --manifest-path=./program/Cargo.toml --bpf-out-dir=dist/program
```


### How to deploy program on solana

```sh
solana program deploy dist/program/mpl_auction.so
```