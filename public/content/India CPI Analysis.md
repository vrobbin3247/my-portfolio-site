# India CPI Analysis Dashboard: Real-Time Economic Insights from Government Data

An interactive web application that transforms India's Consumer Price Index data into actionable insights through advanced visualization, trend analysis, and machine learning-powered forecasting.

## Project Overview

This Streamlit-based dashboard provides comprehensive analysis of India's Consumer Price Index (CPI) data spanning from 2013 to 2025, sourced directly from the Ministry of Statistics and Programme Implementation (MoSPI) API. The application offers multi-dimensional analysis across states, sectors, commodity groups, and time periods, making complex economic data accessible to researchers, policymakers, and analysts.

**Key Features:**

- Real-time CPI metrics with month-over-month change calculations
- Interactive multi-state and multi-sector comparative analysis
- Geographic visualization through interactive choropleth maps
- Time series forecasting using LSTM neural networks
- Comprehensive data filtering and export capabilities

## Technical Architecture

### Data Pipeline and Processing

#### 1. Getting credentials from MOSPI API

```json
POST: https://api.mospi.gov.in/api/users/login
Body:
{
"username": "any_username",
"password": "password",
"organization": "your_organisation",
"purpose": "your_purpose",
"gender": "Male/Female"
}
Successful Response:
"msg": "Login successful",
    "statusCode": true,
    "response": {
        "username": "selected_username",
        "gender": "selected_gender",
        "role": "users",
        "createdAt": "Date",
        "token": "GENERATED_TOKEN"
    }
```

#### 2. Getting data

```json
GET: https://api.mospi.gov.in/api/cpi/getCPIIndex
///add Auth token in Authorization
Body:
{
"username": "any_username",
"password": "password",
"organization": "your_organisation",
"purpose": "your_purpose",
"gender": "Male/Female"
}
```

**Data Structure:**

- **Geographic Coverage**: 36 states/UTs plus All India aggregation
- **Sector Classification**: Rural, Urban, and Combined
- **Commodity Groups**: 7 major categories including Food & Beverages, Housing, Fuel & Light
- **Subgroup Granularity**: 24 detailed subcategories for precise analysis

### Interactive Visualization System

#### 1. Real-Time CPI Metrics Dashboard

Displays current month CPI values with percentage change calculations:

<img src="gifs/dashboard.gif" width=80% alt="Dashboard GIF" />

```python
def old_new_extractor(state, sector):
    data = (df['state'] == state) & (df["sector"] == sector) & (df["group"] == "General")
    old_gi = df[data]['index'].values[-2]  # Previous month
    new_gi = df[data]['index'].values[-1]  # Current month
    gi_date = df[data].index.values[-1]
    return old_gi, new_gi, gi_date
```

The metrics display uses Streamlit's native metric widgets with inverse delta coloring to highlight inflation concerns (red for increases, green for decreases).

#### 2. Multi-Dimensional Trend Analysis

Advanced filtering system allowing infinite comparison possibilities:

<img src="gifs/filtering.gif" width="80%" alt="Filtering GIF" />

```python
# Dynamic pivot table generation based on user selections
if not selected_subgroups:
    pivot_df = filtered_df.pivot_table(
        index=filtered_df.index,
        columns=['state', 'sector', 'group'],
        values='index'
    )
else:
    pivot_df = filtered_df.pivot_table(
        index=filtered_df.index,
        columns=['state', 'sector', 'group', 'subgroup'],
        values='index'
    )
```

#### 3. Geographic CPI Visualization

Interactive choropleth mapping using Plotly and GeoJSON boundary data:

<img src="gifs/filtering.gif" width="80%" alt="Filtering GIF" />

```python
def show_map(sector, latest_cpi):
    # State name standardization for GeoJSON matching
    state_mapping = {
        "Andaman and Nicobar Islands": "Andaman and Nicobar Island",
        "Arunachal Pradesh": "Arunanchal Pradesh",
        "Delhi": "NCT of Delhi",
        # Additional mappings for data consistency
    }

    latest_cpi["state"] = latest_cpi["state"].replace(state_mapping)

    fig = px.choropleth(
        latest_cpi,
        geojson=india_states,
        locations="state",
        featureidkey="properties.st_nm",
        color="index",
        color_continuous_scale="PuBu"
    )
```

### Machine Learning Integration

#### LSTM-Based Time Series Forecasting

The application implements Long Short-Term Memory networks for predicting future CPI trends:

<img src="gifs/forecasting.gif" width="80%" alt="Filtering GIF" />

```python
def predict_future(model, data, scaler, window_size=12, steps=12):
    """Predicts the next `steps` months using the last `window_size` data points."""

    scaled_data = scaler.transform(data.reshape(-1, 1))
    last_window = scaled_data[-window_size:].flatten()
    predictions = []

    for step in range(steps):
        input_seq = last_window.reshape(1, -1)
        pred_scaled = model.predict(input_seq)[0][0]
        pred_original = scaler.inverse_transform(np.array([[pred_scaled]]))[0][0]
        predictions.append(pred_original)

        # Update sliding window
        last_window = np.append(last_window[1:], pred_scaled)

    return np.array(predictions)
```

**Model Architecture:**

```python
model = Sequential([
            Dense(16, activation='relu', input_shape=(input_shape,)),
            Dropout(0.15),
            Dense(8, activation='relu'),
            Dropout(0.15),
            Dense(1)
        ])
```

## Feature Implementation

### 1. CPI Change Metrics

Real-time dashboard displaying:

- Current month CPI values across Rural, Urban, and Combined sectors
- Month-over-month percentage changes with visual indicators
- State-specific analysis through dropdown selection

### 2. Comparative Trend Analysis

- Multi-state comparison capabilities
- Sector-wise analysis (Rural vs Urban vs Combined)
- Commodity group and subgroup filtering
- Date range selection with interactive slider
- Data export functionality in CSV format

### 3. Geographic Analysis Tools

Three visualization modes:

- **Interactive Map**: Choropleth visualization using Indian state boundaries
- **Data Table**: Sortable tabular view with numerical precision
- **Bar Chart**: Comparative visualization using Altair charting

### 4. Predictive Analytics

- 5-month and 12-month forecasting horizons
- Visual distinction between historical and predicted values
- Progress tracking for model execution
- Support for any state-sector-group combination

## Live Application

**[Access the Dashboard](https://india-cpi-analysis-2013-25.streamlit.app/)**

**[View Source Code](https://github.com/vrobbin3247/india-CPI-analysis)**

---

_Built with Python, Streamlit, and advanced data science techniques to democratize access to India's economic data and insights._
