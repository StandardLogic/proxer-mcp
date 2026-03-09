"""Shared fixtures for sync and async client tests."""

import pytest
import respx

from proxer.client import ProxerClient
from proxer.async_client import AsyncProxerClient

BASE_URL = "https://proxer.dev"
API_KEY = "uni_test_xxx"


@pytest.fixture
def client():
    c = ProxerClient(api_key=API_KEY, base_url=BASE_URL)
    yield c
    c.close()


@pytest.fixture
async def async_client():
    c = AsyncProxerClient(api_key=API_KEY, base_url=BASE_URL)
    yield c
    await c.close()


@pytest.fixture
def mock_api():
    with respx.mock(base_url=BASE_URL) as router:
        yield router
