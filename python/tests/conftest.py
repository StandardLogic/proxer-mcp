"""Shared fixtures for sync and async client tests."""

import pytest
import respx

from avatron.client import AvatronClient
from avatron.async_client import AsyncAvatronClient

BASE_URL = "https://avatron.co"
API_KEY = "uni_test_xxx"


@pytest.fixture
def client():
    c = AvatronClient(api_key=API_KEY, base_url=BASE_URL)
    yield c
    c.close()


@pytest.fixture
async def async_client():
    c = AsyncAvatronClient(api_key=API_KEY, base_url=BASE_URL)
    yield c
    await c.close()


@pytest.fixture
def mock_api():
    with respx.mock(base_url=BASE_URL) as router:
        yield router
